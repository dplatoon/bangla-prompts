import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FileText, FolderOpen, Eye, Copy, Users, TrendingUp, Loader2 } from "lucide-react";

interface AdminAnalyticsProps {
  language: 'bn' | 'en';
}

export const AdminAnalytics = ({ language }: AdminAnalyticsProps) => {
  const text = {
    bn: {
      title: "সাইট অ্যানালিটিক্স",
      description: "আপনার সাইটের পারফরম্যান্স দেখুন",
      totalPrompts: "মোট প্রম্পট",
      totalCategories: "মোট ক্যাটেগরি",
      totalViews: "মোট ভিউ",
      totalCopies: "মোট কপি",
      promptsByCategory: "ক্যাটেগরি অনুযায়ী প্রম্পট",
      topPrompts: "টপ প্রম্পট (ভিউ)",
      freeVsPaid: "ফ্রি vs পেইড",
      free: "ফ্রি",
      paid: "পেইড",
      aiUsage: "AI ব্যবহার (আজ)",
    },
    en: {
      title: "Site Analytics",
      description: "View your site performance metrics",
      totalPrompts: "Total Prompts",
      totalCategories: "Total Categories",
      totalViews: "Total Views",
      totalCopies: "Total Copies",
      promptsByCategory: "Prompts by Category",
      topPrompts: "Top Prompts (Views)",
      freeVsPaid: "Free vs Paid",
      free: "Free",
      paid: "Paid",
      aiUsage: "AI Usage (Today)",
    }
  };

  const t = text[language];

  const { data: prompts, isLoading: promptsLoading } = useQuery({
    queryKey: ['analytics-prompts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prompts')
        .select('*, categories(name_bn, name_en)');
      if (error) throw error;
      return data;
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['analytics-categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      return data;
    }
  });

  const { data: aiUsageLogs } = useQuery({
    queryKey: ['analytics-ai-usage'],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count, error } = await supabase
        .from('ai_usage_logs')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());
      if (error) throw error;
      return count || 0;
    }
  });

  if (promptsLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const totalViews = prompts?.reduce((acc, p) => acc + (p.view_count || 0), 0) || 0;
  const totalCopies = prompts?.reduce((acc, p) => acc + (p.copy_count || 0), 0) || 0;
  const freePrompts = prompts?.filter(p => p.is_free).length || 0;
  const paidPrompts = prompts?.filter(p => !p.is_free).length || 0;

  // Category distribution data
  const categoryData = categories?.map(cat => ({
    name: language === 'bn' ? cat.name_bn : cat.name_en,
    count: prompts?.filter(p => p.category_id === cat.id).length || 0
  })).filter(d => d.count > 0) || [];

  // Top prompts by views
  const topPrompts = [...(prompts || [])]
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
    .slice(0, 5)
    .map(p => ({
      name: language === 'bn' ? p.title_bn.slice(0, 20) : p.title_en.slice(0, 20),
      views: p.view_count || 0
    }));

  // Free vs Paid pie chart data
  const freeVsPaidData = [
    { name: t.free, value: freePrompts, color: 'hsl(var(--primary))' },
    { name: t.paid, value: paidPrompts, color: 'hsl(var(--accent))' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          label={t.totalPrompts}
          value={prompts?.length || 0}
          language={language}
        />
        <StatCard
          icon={<FolderOpen className="w-5 h-5" />}
          label={t.totalCategories}
          value={categories?.length || 0}
          language={language}
        />
        <StatCard
          icon={<Eye className="w-5 h-5" />}
          label={t.totalViews}
          value={totalViews}
          language={language}
        />
        <StatCard
          icon={<Copy className="w-5 h-5" />}
          label={t.totalCopies}
          value={totalCopies}
          language={language}
        />
      </div>

      {/* AI Usage */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className={`text-lg flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
            <TrendingUp className="w-5 h-5 text-primary" />
            {t.aiUsage}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-primary">{aiUsageLogs}</p>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Prompts by Category */}
        <Card>
          <CardHeader>
            <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>{t.promptsByCategory}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100} 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Free vs Paid */}
        <Card>
          <CardHeader>
            <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>{t.freeVsPaid}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={freeVsPaidData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {freeVsPaidData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>{t.topPrompts}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPrompts}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 11 }}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="views" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  language: 'bn' | 'en';
}

const StatCard = ({ icon, label, value, language }: StatCardProps) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <span className="text-2xl font-bold">{value.toLocaleString()}</span>
      </div>
      <p className={`text-sm text-muted-foreground mt-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
        {label}
      </p>
    </CardContent>
  </Card>
);
