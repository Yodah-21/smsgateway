import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden floating-shapes">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex w-full max-w-6xl bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-start p-12 text-white">
            <div className="mb-8">
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
                  <div className="w-8 h-8 bg-[hsl(213,87%,42%)] rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                  </div>
                </div>
                <h1 className="text-4xl font-bold">Innovation</h1>
              </div>
              <p className="text-lg opacity-90 mb-8">The Future Is Better Together</p>
            </div>
            <h2 className="text-3xl font-semibold mb-4">Messaging Portal</h2>
            <p className="text-lg opacity-75">Secure access to your telecommunications dashboard</p>
          </div>
          
          
          <div className="w-full lg:w-1/2 bg-white p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Messaging Portal Login</h3>
              
              <form onSubmit={handleLogin}>
                <div className="mb-6">
                  <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(213,87%,42%)] focus:border-transparent transition-all duration-200"
                    placeholder="Demo: admin"
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(213,87%,42%)] focus:border-transparent transition-all duration-200"
                    placeholder="Demo: password"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(213,87%,42%)]"
                >
                  LOGIN
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <a href="#" className="text-[hsl(213,87%,42%)] hover:text-[hsl(213,87%,35%)] text-sm">
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
