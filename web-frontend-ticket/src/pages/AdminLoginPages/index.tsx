
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { login, loginSchema, type LoginValues } from "@/services/auth/auth.service"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import secureLocalStorage from "react-secure-storage"
import { SESSION_KEY } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

export default function AdminLoginPage() {
  // schema zod
	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			role: "admin",
		},
	});

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (data: LoginValues) => login(data),
	});

	const navigate = useNavigate();

	const onSubmit = async (val: LoginValues) => {
		try {
			const response = await mutateAsync(val);
// save response login
			secureLocalStorage.setItem(SESSION_KEY, response.data);

			navigate("/admin"); //direct page admin
		} catch (error) {
			console.log(error);
		}
	};

  // Form login dari shadcn.ui
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="mx-auto mas-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your accounnt  
          </CardDescription> 
        </CardHeader>    
        <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Input Email" {...field} />
                    </FormControl>
                    <FormMessage /> {/*validasi error*/}
                  </FormItem>
                )}
              />
              </div>
              <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Input Password" {...field} />
                    </FormControl>
                    <FormMessage /> {/*validasi error*/}
                  </FormItem>
                )}
              />
              </div>
              <Button isLoading={isPending} type="submit" className="w-full">
                Login
              </Button>
            </div>
        </CardContent>
      </Card>
      </form>
    </Form>
  )
}
