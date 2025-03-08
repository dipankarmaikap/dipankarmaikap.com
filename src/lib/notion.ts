async function getPageDetails(url: string, status?: string) {
  const DATABASE_ID = "1a708dd6f7de80528437f3db4f1099ed";
  const endpoint = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Notion-Version": "2022-06-28",
      Authorization: `Bearer ${import.meta.env.NOTION_API_KEY}`,
      "Content-Type": "application/json", // Add this
    },
    body: JSON.stringify({
      filter: {
        and: [
          {
            property: "url",
            formula: {
              string: {
                equals: url,
              },
            },
          },
          {
            property: "Status",
            status: {
              equals: status || "Published",
            },
          },
        ],
      },
    }),
  });

  const data = await response.json();

  const pageId = data.results[0].id;
  let page = data.results[0];
  const pageResponse = await fetch(
    `https://api.notion.com/v1/blocks/${pageId}/children`,
    {
      headers: {
        "Notion-Version": "2022-06-28",
        Authorization: `Bearer ${import.meta.env.NOTION_API_KEY}`,
      },
    }
  );

  const pageContent = await pageResponse.json();
  page.blocks = pageContent.results;
  return page;
}

export { getPageDetails };
