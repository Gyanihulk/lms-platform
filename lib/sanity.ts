import {createClient, SanityClient} from '@sanity/client'


export const client = createClient({
    projectId: "akldf27l",
    dataset: "production",
    apiVersion: "2023-05-03", 
    // token: import.meta.env.VITE_SANITY_TOKEN,
  });