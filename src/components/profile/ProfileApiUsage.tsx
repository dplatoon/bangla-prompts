import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Zap, MessageSquare, Sparkles, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ProfileApiUsageProps {
  language: 'bn' | 'en';
  userId: string;
}

export const ProfileApiUsage = ({ language, userId }: ProfileApiUsageProps) => {
  const text = {
    bn: {
      title: "API ব্যবহার",
      description: "আপনার AI API ব্যবহারের পরিসংখ্যান",
      noUsage: "আপনি এখনো কোনো AI ফিচার ব্যবহার করেননি",
      totalCalls: "মোট কল",
      today: "আজ",
      thisWeek: "এই সপ্তাহ",
      thisMonth: "এই মাস",
      usageByFunction: "ফিচার অনুযায়ী ব্যবহার",
      recentActivity: "সাম্প্রতিক কার্যকলাপ",
      chat: "চ্যাট",
      generatePrompt: "প্রম্পট জেনারেট",
      suggestPrompt: "সাজেশন",
    },
    en: {
      title: "API Usage",
      description: "View your AI API usage statistics",
      noUsage: "You haven't used any AI features yet",
      totalCalls: "Total Calls",
      today: "Today",
      thisWeek: "This Week",
      thisMonth: "This Month",
      usageByFunction: "Usage by Feature",
      recentActivity: "Recent Activity",
      chat: "Chat",
      generatePrompt: "Generate Prompt",
      suggestPrompt: "Suggestions",
    }
  };

  const t = text[language];

  const { data: usageLogs, isLoading } = useQuery({
    queryKey: ['api-usage', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_usage_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  // Calculate stats
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const todayCount = usageLogs?.filter(log => new Date(log.created_at) >= todayStart).length || 0;
  const weekCount = usageLogs?.filter(log => new Date(log.created_at) >= weekStart).length || 0;
  const monthCount = usageLogs?.filter(log => new Date(log.created_at) >= monthStart).length || 0;

  // Usage by function
  const functionCounts: Record<string, number> = {};
  usageLogs?.forEach(log => {
    functionCounts[log.function_name] = (functionCounts[log.function_name] || 0) + 1;
  });

  const functionData = Object.entries(functionCounts).map(([name, count]) => ({
    name: name === 'chat' ? t.chat : name === 'generate-prompt' ? t.generatePrompt : name === 'suggest-prompt' ? t.suggestPrompt : name,
    count
  }));

  const getFunctionIcon = (name: string) => {
    switch (name) {
      case 'chat': return <MessageSquare className="w-4 h-4" />;
      case 'generate-prompt': return <Sparkles className="w-4 h-4" />;
      case 'suggest-prompt': return <Zap className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getFunctionLabel = (name: string) => {
    switch (name) {
      case 'chat': return t.chat;
      case 'generate-prompt': return t.generatePrompt;
      case 'suggest-prompt': return t.suggestPrompt;
      default: return name;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.today}
            </p>
            <p className="text-3xl font-bold text-primary">{todayCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.thisWeek}
            </p>
            <p className="text-3xl font-bold text-primary">{weekCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.thisMonth}
            </p>
            <p className="text-3xl font-bold text-primary">{monthCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage by Function */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
            <Activity className="w-5 h-5 text-primary" />
            {t.usageByFunction}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {functionData.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                {t.noUsage}
              </p>
            </div>
          ) : (
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={functionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {usageLogs && usageLogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
              <Zap className="w-5 h-5 text-primary" />
              {t.recentActivity}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {usageLogs.slice(0, 10).map((log) => {
                const logDate = new Date(log.created_at).toLocaleDateString(
                  language === 'bn' ? 'bn-BD' : 'en-US',
                  { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
                );
                
                return (
                  <div 
                    key={log.id} 
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {getFunctionIcon(log.function_name)}
                      </div>
                      <span className={language === 'bn' ? 'font-bengali' : ''}>
                        {getFunctionLabel(log.function_name)}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {logDate}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
