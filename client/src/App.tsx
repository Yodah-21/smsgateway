import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import BulkSMS from "@/pages/bulk-sms";
import Messages from "@/pages/messages";
import SenderIds from "@/pages/sender-ids";
import Accounts from "@/pages/accounts";
import Providers from "@/pages/providers";
import Reports from "@/pages/reports";
import SMSBalances from "@/pages/sms-balances";
import Tariffs from "@/pages/tariffs";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/bulk-sms" component={BulkSMS} />
      <Route path="/messages" component={Messages} />
      <Route path="/sender-ids" component={SenderIds} />
      <Route path="/accounts" component={Accounts} />
      <Route path="/providers" component={Providers} />
      <Route path="/reports" component={Reports} />
      <Route path="/sms-balances" component={SMSBalances} />
      <Route path="/tariffs" component={Tariffs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
