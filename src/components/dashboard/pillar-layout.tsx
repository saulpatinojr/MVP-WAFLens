"use client";

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarRail, SidebarTrigger, SidebarFooter } from '@/components/ui/sidebar';
import { MainNav } from '@/components/dashboard/main-nav';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, ChevronLeft } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PillarLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  score: number;
  children?: React.ReactNode;
}

export function PillarLayout({ title, description, icon, iconBg, score, children }: PillarLayoutProps) {
  const { user, signOut } = useAuth();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarRail />
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="size-9" asChild>
              <Link href="/">
                <Logo className="size-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            <h2 className="text-lg font-semibold tracking-tight">WAFLens</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter>
          {user && (
            <div className="p-2">
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start px-2">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-xs truncate">
                      <span className="font-medium">{user.displayName || 'User'}</span>
                      <span className="text-muted-foreground truncate max-w-[120px]">{user.email}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex-1 flex flex-col min-h-0">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Link>
            </Button>
          </header>
          <main className="flex-1 flex flex-col p-4 md:p-8 pt-6 overflow-y-auto">
            {/* Pillar Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${iconBg}`}>
                  {icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              </div>
              
              {/* Score Card */}
              <Card className="max-w-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold">{score}%</span>
                    <Progress value={score} className="flex-1" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pillar Content */}
            {children || (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment</CardTitle>
                    <CardDescription>Complete the assessment questionnaire</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Start Assessment</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>AI-powered improvement suggestions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Complete an assessment to receive personalized recommendations.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Resources</CardTitle>
                    <CardDescription>Best practices and documentation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Resources</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
