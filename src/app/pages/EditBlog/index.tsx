import React, { useEffect, useState} from "react";
import { useRouteMatch } from "react-router-dom";
import { blogsService } from "services/blogs.service";

export const EditBlog = () => {
    const match: any = useRouteMatch();
    const { blog_id } = match.params;
    
    const [ blog, setBlog ]: any = useState(null);
    const [ slug, setSlug ]: any = useState("index");

    useEffect(() => {
      blogsService.getBlog(blog_id).then(setBlog);
    }, [])
  
    if (!blog) return null;
    const { public_key } = blog;

    return (  
        <>
            <iframe
                style={{
                    position: "absolute",
                    left: "11rem"
                }}
                className="w-screen h-screen border-2 border-dashed border-slate-700 p-5" 
                src={"http://localhost:3002/blogs/edit/" + public_key + `/${slug}`}
            />
        </>
    )
}