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

  // Expression evaluator with PEMDAS
  if (
    query.toLowerCase().includes("plus") ||
    query.toLowerCase().includes("minus") ||
    query.toLowerCase().includes("multiplied by") ||
    query.toLowerCase().includes("divided by") ||
    query.toLowerCase().includes("to the power of") ||
    /\d+\s*[+\-*/^]\s*\d+/.test(query)
  ) {
    // Normalize the query into a math expression string
    let expr = query.toLowerCase();
    // Remove everything before "what is" or "calculate" if present
    expr = expr.replace(/^.*?(?:what is|calculate)\s*/i, "");
    // Remove trailing question mark
    expr = expr.replace(/\?$/, "").trim();
    // Replace words with operators
    expr = expr.replace(/\bto the power of\b/g, "^");
    expr = expr.replace(/\bmultiplied by\b/g, "*");
    expr = expr.replace(/\bdivided by\b/g, "/");
    expr = expr.replace(/\bplus\b/g, "+");
    expr = expr.replace(/\bminus\b/g, "-");
    // Remove any remaining non-math characters (keep digits, operators, spaces, dots)
    expr = expr.replace(/[^0-9+\-*/^.\s]/g, "").trim();

    try {
      const result = evaluateExpression(expr);
      return result.toString();
    } catch {
      return "";
    }
  }

  if (query.toLowerCase().includes("square") && query.toLowerCase().includes("cube")) {
    const matches = query.match(/\d+/g);
    if (matches) {
      const results = matches.map(Number).filter((n) => {
        const sqrt = Math.round(Math.pow(n, 1 / 2));
        const cbrt = Math.round(Math.pow(n, 1 / 3));
        return sqrt * sqrt === n && cbrt * cbrt * cbrt === n;
      });
      return results.sort((a, b) => a - b).join(", ");
    }
    return "";
  }
  if (query.toLowerCase().includes("prime")) {
    const matches = query.match(/\d+/g);
    if (matches) {
      const isPrime = (n: number) => {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) return false;
        }
        return true;
      };
      const results = matches.map(Number).filter(isPrime);
      return results.sort((a, b) => a - b).join(", ");
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

// Recursive descent parser for PEMDAS using BigInt
function evaluateExpression(expr: string): bigint {
  const tokens = tokenize(expr);
  let pos = 0;

  function peek(): string | null {
    return pos < tokens.length ? tokens[pos] : null;
  }
  function consume(): string {
    return tokens[pos++];
  }

  // Addition and subtraction (lowest precedence)
  function parseAddSub(): bigint {
    let left = parseMulDiv();
    while (peek() === "+" || peek() === "-") {
      const op = consume();
      const right = parseMulDiv();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }

  // Multiplication and division
  function parseMulDiv(): bigint {
    let left = parsePower();
    while (peek() === "*" || peek() === "/") {
      const op = consume();
      const right = parsePower();
      left = op === "*" ? left * right : left / right;
    }
    return left;
  }

  // Exponentiation (right-associative)
  function parsePower(): bigint {
    let base = parseAtom();
    if (peek() === "^") {
      consume();
      const exp = parsePower();
      base = base ** exp;
    }
    return base;
  }

  // Numbers
  function parseAtom(): bigint {
    const token = consume();
    try {
      return BigInt(token);
    } catch {
      throw new Error("Unexpected token: " + token);
    }
  }

  const result = parseAddSub();
  return result;
}

function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < expr.length) {
    if (expr[i] === " ") {
      i++;
      continue;
    }
    if ("+-*/^".includes(expr[i])) {
      tokens.push(expr[i]);
      i++;
    } else if (/[0-9.]/.test(expr[i])) {
      let num = "";
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        num += expr[i];
        i++;
      }
      tokens.push(num);
    } else {
      i++;
    }
  }
  return tokens;
}
  }
  return tokens;
}
