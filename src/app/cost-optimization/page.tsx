"use client";

import { PillarLayout } from '@/components/dashboard/pillar-layout';
import { PiggyBank, DollarSign, TrendingDown, BarChart2, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const costControls = [
  {
    id: 'cost-1',
    name: 'Reserved Instances',
    description: 'Use reserved instances for predictable workloads',
    status: 'compliant',
    icon: DollarSign,
  },
  {
    id: 'cost-2',
    name: 'Right-sizing',
    description: 'Optimize resource sizes for actual usage',
    status: 'partial',
    icon: Calculator,
  },
  {
    id: 'cost-3',
    name: 'Unused Resources',
    description: 'Identify and remove unused resources',
    status: 'action-required',
    icon: TrendingDown,
  },
  {
    id: 'cost-4',
    name: 'Cost Monitoring',
    description: 'Track and analyze cloud spending',
    status: 'compliant',
    icon: BarChart2,
  },
  {
    id: 'cost-5',
    name: 'Budget Alerts',
    description: 'Set up alerts for budget thresholds',
    status: 'compliant',
    icon: PiggyBank,
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

export default function CostOptimizationPage() {
  return (
    <PillarLayout
      title="Cost Optimization"
      description="Achieve business objectives while minimizing costs and maximizing return on investment."
      icon={<PiggyBank className="h-6 w-6 text-yellow-500" />}
      iconBg="bg-yellow-100"
      score={85}
    >
      <div className="space-y-6">
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Cost Controls</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {costControls.map((control) => (
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
