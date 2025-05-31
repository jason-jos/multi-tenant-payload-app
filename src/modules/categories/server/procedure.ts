import { baseProcedure, createTRPCRouter } from "@/trpc/init";


import { Category } from "@/payload-types";

export const categoriesRouter=createTRPCRouter({
    getMany:baseProcedure.query(async ({ctx})=>{

    const data = await ctx.payload. find({
      collection: "categories",
      depth: 1, //subcategory[0] will be a type of "Category"
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

      const formattedData = data.docs.map((doc) => ({
        ...doc,
        subcategories:
        //Because of 'depth:1' we can be sure the subcategory doc will be of type "Category" and it fixes the ts warning as explained at 2:41:20
          doc?.subcategories?.docs ?? [].map((doc) => ({ ...(doc as Category),subcategories:null })) 
      }));
        return formattedData
    })
})