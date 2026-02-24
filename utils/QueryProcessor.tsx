export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("andrewid")) {
    return "darodri2";
  }
  if (query.toLowerCase().includes("andrew id")) {
    return "darodri2";
  }
  if (query.toLowerCase().includes("name")) {
    return "darodri2";
  }
  if (query.toLowerCase().includes("plus")) {
    const matches = query.match(/(\d+)\s+plus\s+(\d+)/i);
    if (matches) {
      return (parseInt(matches[1]) + parseInt(matches[2])).toString();
    }
    return "";
  }

  return "";
}
