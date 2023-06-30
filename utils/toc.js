export const getHeadings = (source) => {
    const regex = /<h3>(.*?)<\/h3>/g;
  
    if (source.match(regex)) {
      return source.match(regex).map((heading) => {
        const headingText = heading.replace("<h3>", "").replace("</h3>", "");
  
        const link = "#" + headingText.replace(/ /g, "_").toLowerCase();
  
        return {
          text: headingText,
          link,
        };
      });
    }
  
    return [];
  };