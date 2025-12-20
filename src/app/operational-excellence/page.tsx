"use client";

import { PillarLayout } from '@/components/dashboard/pillar-layout';
import { Crosshair, GitBranch, FileText, Activity, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const operationalControls = [
  {
    id: 'ops-1',
    name: 'Infrastructure as Code',
    description: 'Manage infrastructure through version-controlled code',
    status: 'compliant',
    icon: GitBranch,
  },
  {
    id: 'ops-2',
    name: 'Runbook Documentation',
    description: 'Document operational procedures and runbooks',
    status: 'partial',
    icon: FileText,
  },
  {
    id: 'ops-3',
    name: 'Observability',
    description: 'Implement comprehensive logging, metrics, and tracing',
    status: 'partial',
    icon: Activity,
  },
  {
    id: 'ops-4',
    name: 'Team Organization',
    description: 'Define clear ownership and escalation paths',
    status: 'compliant',
    icon: Users,
  },
  {
    id: 'ops-5',
    name: 'Continuous Improvement',
    description: 'Learn from incidents and continuously improve',
    status: 'partial',
    icon: Crosshair,
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

export default function OperationalExcellencePage() {
  return (
    <PillarLayout
      title="Operational Excellence"
      description="Run and monitor systems to deliver business value and continually improve supporting processes."
      icon={<Crosshair className="h-6 w-6 text-red-500" />}
      iconBg="bg-red-100"
      score={78}
    >
      <div className="space-y-6">
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Operational Controls</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {operationalControls.map((control) => (
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
