import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "bwvf5737",
  dataset: "production",
  token: 'skg20bhKPoR15POYPzn85gsF53sJfqNhOHi5FwoP4w1nSiHNWM6f9qNCgh90qm6WFK3N7yIXO4WwM1kpmFGxY6ECHBkcrxCyjiCtHmPP5nMDQSrsXnsdqO3vRpIiVASR0Yaam8KunCSUISUl5ketyzEkBMLdyznxYFDICsFJhxNQaAiIH3wi',
  apiVersion: "2024-01-01",
  useCdn: false,
});