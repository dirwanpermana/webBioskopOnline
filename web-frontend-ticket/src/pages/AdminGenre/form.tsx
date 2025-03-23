// file utk halaman Form Add Genre
import TitleHeading from "@/components/TitleHeading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createGenre, genreSchema, updateGenre, type GenreValues } from "@/services/genre/genre.service";
import type { Genre } from "@/services/genre/genre.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Save } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AdminGenreForm() {
    const detail = useLoaderData() as Genre | undefined
    
// resolver: Menggunakan zodResolver untuk validasi form berdasarkan genreSchema.
    const form = useForm<GenreValues>({
        resolver: zodResolver(genreSchema),
        defaultValues: {
            name: detail?.name, //schema ini dari genre.services
        },
    });

    const {isPending, mutateAsync} = useMutation({
    // ada validasi, kalo detail = undefined createGenre, kalo ada ke updateGenre
        mutationFn: (data: GenreValues) =>
			detail === undefined ? createGenre(data) : updateGenre(data, detail._id),
    });

    const navigate = useNavigate()

// fungsi submit data. value genre
    const onSubmit = async (val: GenreValues)=> {
        try {
            await mutateAsync(val)
            navigate("/admin/genres")
// message toast tergantung kondisi tampil create / update 
            toast.success(`Genre data succesfully ${detail === undefined ? "created" : "updated"}`)
        } catch (error) {
            console.log(error);
            toast("Something went wrong")
        }
    };

    return (
    <>
        <TitleHeading title= {`${detail === undefined ? "Created" : "Updated"} data genre`} />

        <Form {...form}>
{/*form.handleSubmit Fungsi utk mengelola dan validasi sebelum memanggil fungsi onSubmit. */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-1/2">
            
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name Genre</FormLabel>
                    <FormControl>
                      <Input placeholder="Input Name" {...field} />
                    </FormControl>
                    <FormMessage /> {/*validasi error*/}
                  </FormItem>
                )}
              /> 

              <Button isLoading={isPending} className="bg-green-500 hover:bg-green-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                    Submit
              </Button>
              
            <Button variant="secondary" className="ml-2 bg-red-500 hover:bg-red-700 text-white">
                <Link to="/admin/genres">Cancel</Link>
            </Button>

            </form>
        </Form>
    </>
    )
}