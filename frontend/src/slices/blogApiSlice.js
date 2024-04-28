import { BLOG_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";
export const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: BLOG_URL,
      }),
      providesTags: ["Blogs"],
      keepUnusedDateFor: 5,
    }),
    getBlogDetails: builder.query({
      query: (blogId) => ({
        url: `${BLOG_URL}/${blogId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createBlog: builder.mutation({
      query: () => ({
        url: BLOG_URL,
        method: "POST",
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.blogId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `${BLOG_URL}/${blogId}`,
        method: "DELETE",
      }),
    }),
    uploadBlogImage: builder.mutation({
      query:(data)=>({
        url:`${UPLOAD_URL}`,
        method:'POST',
        body:data
      })
    })
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogDetailsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useUploadBlogImageMutation,
} = blogsApiSlice;
