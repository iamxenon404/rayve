// For now, this mimics a database fetch. 
// Later, you'll replace the fetch URL with your Shopify/Medusa endpoint.

export async function getProducts() {
  // Example of a headless fetch call
  // const res = await fetch('https://your-store.myshopify.com/api/2024-01/graphql.json', ...)
  
  return [
    {
      id: "1",
      slug: "rayve-heavy-tee",
      name: "Rayve Heavyweight Tee",
      price: 55,
      image: "/sample-product.jpg",
      description: "280GSM Organic Cotton. Boxy fit."
    },
    {
      id: "2",
      slug: "rayve-nylon-track-pants",
      name: "Rayve Track Pants",
      price: 110,
      image: "/sample-pants.jpg",
      description: "Water-resistant nylon with adjustable toggles."
    }
  ];
}