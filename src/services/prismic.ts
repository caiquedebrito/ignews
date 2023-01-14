import { createClient } from "@prismicio/client";
import sm from "../../sm.json"

export function getPrismicClient() {
  const prismic = createClient(sm.apiEndpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  })

  return prismic
}