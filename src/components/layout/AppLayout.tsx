import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-background">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Global header with sidebar trigger */}
        <header className="h-12 flex items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 lg:hidden">
          <SidebarTrigger className="ml-4" />
          <div className="ml-4">
            <h1 className="font-display text-lg font-bold text-accent">Mars Research Hub</h1>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50 backdrop-blur">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                Built with <span className="text-accent font-medium">Bolt AI</span>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}