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
  if (query.toLowerCase().includes("plus") || query.includes("+")) {
    const matches = query.match(/(\d+)\s+(?:plus|\+)\s+(\d+)/i);
    if (matches) {
      return (parseInt(matches[1]) + parseInt(matches[2])).toString();
    }
    return "";
  }
  if (query.toLowerCase().includes("minus") || query.includes("-")) {
    const matches = query.match(/(\d+)\s+(?:minus|-)\s+(\d+)/i);
    if (matches) {
      return (parseInt(matches[1]) - parseInt(matches[2])).toString();
    }
    return "";
  }
  if (query.toLowerCase().includes("multiplied by") || query.includes("*")) {
    const matches = query.match(/(\d+)\s+(?:multiplied by|\*)\s+(\d+)/i);
    if (matches) {
      return (parseInt(matches[1]) * parseInt(matches[2])).toString();
    }
    return "";
  }
  if (query.toLowerCase().includes("divided by") || query.includes("/")) {
    const matches = query.match(/(\d+)\s+(?:divided by|\/)\s+(\d+)/i);
    if (matches) {
      return (parseInt(matches[1]) / parseInt(matches[2])).toString();
    }
    return "";
  }
  if (query.toLowerCase().includes("square") && query.toLowerCase().includes("cube")) {
    const matches = query.match(/\d+/g);
    if (matches) {
      const results = matches.map(Number).filter((n) => {
        const sqrt = Math.round(Math.pow(n, 1 / 2));
        const cbrt = Math.round(Math.pow(n, 1 / 3));
        return sqrt * sqrt === n && cbrt * cbrt * cbrt === n;
      });
      return results.join(", ");
    }
    return "";
  }
  if (query.toLowerCase().includes("largest")) {
    const matches = query.match(/\d+/g);
    if (matches) {
      return Math.max(...matches.map(Number)).toString();
    }
    return "";
  }
  if (query.toLowerCase().includes("smallest")) {
    const matches = query.match(/\d+/g);
    if (matches) {
      return Math.min(...matches.map(Number)).toString();
    }
    return "";
  }

  return "";
}
