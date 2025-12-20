"use client";

import { PillarLayout } from '@/components/dashboard/pillar-layout';
import { Gauge, Zap, BarChart3, Cpu, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const performanceControls = [
  {
    id: 'perf-1',
    name: 'Resource Optimization',
    description: 'Right-size resources for optimal performance',
    status: 'partial',
    icon: Cpu,
  },
  {
    id: 'perf-2',
    name: 'Auto-scaling',
    description: 'Scale resources automatically based on demand',
    status: 'compliant',
    icon: TrendingUp,
  },
  {
    id: 'perf-3',
    name: 'Caching Strategy',
    description: 'Implement effective caching at multiple levels',
    status: 'action-required',
    icon: Zap,
  },
  {
    id: 'perf-4',
    name: 'Performance Monitoring',
    description: 'Monitor and analyze performance metrics',
    status: 'partial',
    icon: BarChart3,
  },
  {
    id: 'perf-5',
    name: 'Load Testing',
    description: 'Regularly test system under load',
    status: 'action-required',
    icon: Gauge,
  },
];

const statusColors = {
  'compliant': 'bg-green-100 text-green-800',
  'partial': 'bg-yellow-100 text-yellow-800',
  'action-required': 'bg-red-100 text-red-800',
};

const statusLabels = {
  'compliant': 'Compliant',
  'partial': 'Partial',
  'action-required': 'Action Required',
};

export default function PerformanceEfficiencyPage() {
  return (
    <PillarLayout
      title="Performance Efficiency"
      description="Use computing resources efficiently to meet system requirements and maintain efficiency as demand changes."
      icon={<Gauge className="h-6 w-6 text-green-500" />}
      iconBg="bg-green-100"
      score={82}
    >
      <div className="space-y-6">
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Performance Controls</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {performanceControls.map((control) => (
              <Card key={control.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <control.icon className="h-5 w-5 text-muted-foreground" />
                    <Badge className={statusColors[control.status as keyof typeof statusColors]}>
                      {statusLabels[control.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{control.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{control.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PillarLayout>
  );
}
