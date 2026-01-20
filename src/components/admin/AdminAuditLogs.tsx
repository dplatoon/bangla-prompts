import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, History, FileText, FolderOpen, Plus, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { Database } from "@/integrations/supabase/types";

type AuditAction = Database["public"]["Enums"]["audit_action"];

interface AuditLog {
  id: string;
  user_id: string;
  action: AuditAction;
  table_name: string;
  record_id: string;
  old_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
  created_at: string;
}

interface AdminAuditLogsProps {
  language: 'bn' | 'en';
}

export const AdminAuditLogs = ({ language }: AdminAuditLogsProps) => {
  const [tableFilter, setTableFilter] = useState<"all" | "prompts" | "categories">("all");
  const [actionFilter, setActionFilter] = useState<"all" | AuditAction>("all");

  const text = {
    bn: {
      title: "অডিট লগ",
      description: "প্রম্পট এবং ক্যাটেগরিতে সকল পরিবর্তনের ইতিহাস",
      loading: "লোড হচ্ছে...",
      noLogs: "কোনো অডিট লগ নেই",
      date: "তারিখ",
      action: "অ্যাকশন",
      table: "টেবিল",
      recordId: "রেকর্ড আইডি",
      changes: "পরিবর্তন",
      all: "সব",
      prompts: "প্রম্পট",
      categories: "ক্যাটেগরি",
      create: "তৈরি",
      update: "আপডেট",
      delete: "মুছে ফেলা",
      filterByTable: "টেবিল অনুযায়ী",
      filterByAction: "অ্যাকশন অনুযায়ী",
      created: "তৈরি করা হয়েছে",
      updated: "আপডেট করা হয়েছে",
      deleted: "মুছে ফেলা হয়েছে",
    },
    en: {
      title: "Audit Logs",
      description: "History of all changes to prompts and categories",
      loading: "Loading...",
      noLogs: "No audit logs found",
      date: "Date",
      action: "Action",
      table: "Table",
      recordId: "Record ID",
      changes: "Changes",
      all: "All",
      prompts: "Prompts",
      categories: "Categories",
      create: "Create",
      update: "Update",
      delete: "Delete",
      filterByTable: "Filter by table",
      filterByAction: "Filter by action",
      created: "Created",
      updated: "Updated",
      deleted: "Deleted",
    }
  };

  const t = text[language];

  const { data: auditLogs, isLoading } = useQuery({
    queryKey: ['admin-audit-logs', tableFilter, actionFilter],
    queryFn: async (): Promise<AuditLog[]> => {
      // Fetch all logs and filter client-side for simpler type handling
      const { data, error } = await supabase
        .from('admin_audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      
      if (error) {
        throw error;
      }
      
      let logs: AuditLog[] = data as AuditLog[];
      
      // Apply table filter client-side
      if (tableFilter !== "all") {
        logs = logs.filter((log) => log.table_name === tableFilter);
      }
      // Apply action filter client-side
      if (actionFilter !== "all") {
        logs = logs.filter((log) => log.action === actionFilter);
      }
      
      return logs.slice(0, 100);
    },
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <Plus className="w-4 h-4" />;
      case 'update':
        return <Pencil className="w-4 h-4" />;
      case 'delete':
        return <Trash2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getActionBadgeVariant = (action: string): "default" | "secondary" | "destructive" => {
    switch (action) {
      case 'create':
        return "default";
      case 'update':
        return "secondary";
      case 'delete':
        return "destructive";
      default:
        return "default";
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'create':
        return t.created;
      case 'update':
        return t.updated;
      case 'delete':
        return t.deleted;
      default:
        return action;
    }
  };

  const getTableIcon = (tableName: string) => {
    switch (tableName) {
      case 'prompts':
        return <FileText className="w-4 h-4" />;
      case 'categories':
        return <FolderOpen className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getRecordTitle = (log: AuditLog): string => {
    const data = log.new_data || log.old_data;
    if (!data) return log.record_id.slice(0, 8);
    
    if (log.table_name === 'prompts') {
      return (data.title_bn as string) || (data.title_en as string) || log.record_id.slice(0, 8);
    }
    if (log.table_name === 'categories') {
      return (data.name_bn as string) || (data.name_en as string) || log.record_id.slice(0, 8);
    }
    return log.record_id.slice(0, 8);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.loading}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <History className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
              {t.title}
            </CardTitle>
            <CardDescription className={language === 'bn' ? 'font-bengali' : ''}>
              {t.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-col gap-1.5">
            <label className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.filterByTable}
            </label>
            <Select value={tableFilter} onValueChange={(value) => setTableFilter(value as "all" | "prompts" | "categories")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className={language === 'bn' ? 'font-bengali' : ''}>{t.all}</SelectItem>
                <SelectItem value="prompts" className={language === 'bn' ? 'font-bengali' : ''}>{t.prompts}</SelectItem>
                <SelectItem value="categories" className={language === 'bn' ? 'font-bengali' : ''}>{t.categories}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.filterByAction}
            </label>
            <Select value={actionFilter} onValueChange={(value) => setActionFilter(value as "all" | AuditAction)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className={language === 'bn' ? 'font-bengali' : ''}>{t.all}</SelectItem>
                <SelectItem value="create" className={language === 'bn' ? 'font-bengali' : ''}>{t.create}</SelectItem>
                <SelectItem value="update" className={language === 'bn' ? 'font-bengali' : ''}>{t.update}</SelectItem>
                <SelectItem value="delete" className={language === 'bn' ? 'font-bengali' : ''}>{t.delete}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        {!auditLogs || auditLogs.length === 0 ? (
          <div className="text-center py-12">
            <History className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.noLogs}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.date}</TableHead>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.action}</TableHead>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.table}</TableHead>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.changes}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(log.created_at), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={getActionBadgeVariant(log.action)}
                        className="flex items-center gap-1.5 w-fit"
                      >
                        {getActionIcon(log.action)}
                        <span className={language === 'bn' ? 'font-bengali' : ''}>
                          {getActionLabel(log.action)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTableIcon(log.table_name)}
                        <span className="capitalize">{log.table_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {getRecordTitle(log)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
