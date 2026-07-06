export function collectSchemaTypes(blocks: unknown[]): string[] {
  const types = new Set<string>();
  const visit = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    const t = obj["@type"];
    if (typeof t === "string") types.add(t);
    if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.add(x));
    if (Array.isArray(obj["@graph"])) obj["@graph"].forEach(visit);
    Object.values(obj).forEach((v) => {
      if (Array.isArray(v)) v.forEach(visit);
      else if (v && typeof v === "object") visit(v);
    });
  };
  blocks.forEach(visit);
  return [...types];
}

export function countFaqPairs(blocks: unknown[]): number {
  let count = 0;
  const visit = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    if (obj["@type"] === "Question" || (Array.isArray(obj["@type"]) && obj["@type"].includes("Question"))) count++;
    if (obj["@type"] === "FAQPage") {
      const main = obj.mainEntity;
      if (Array.isArray(main)) count = Math.max(count, main.length);
    }
    Object.values(obj).forEach((v) => {
      if (Array.isArray(v)) v.forEach(visit);
      else if (v && typeof v === "object") visit(v);
    });
  };
  blocks.forEach(visit);
  return count;
}

export function orgEntitySignals(blocks: unknown[]) {
  let hasSameAs = false;
  let hasContact = false;
  let hasKnowsAbout = false;
  const visit = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    const type = obj["@type"];
    const types = Array.isArray(type) ? type : [type];
    if (types.some((t) => t === "Organization" || t === "ProfessionalService")) {
      if (obj.sameAs) hasSameAs = true;
      if (obj.email || obj.telephone || obj.contactPoint) hasContact = true;
      if (obj.knowsAbout) hasKnowsAbout = true;
    }
    Object.values(obj).forEach((v) => {
      if (Array.isArray(v)) v.forEach(visit);
      else if (v && typeof v === "object") visit(v);
    });
  };
  blocks.forEach(visit);
  return { hasSameAs, hasContact, hasKnowsAbout };
}

export function hasSchemaType(blocks: unknown[], name: string): boolean {
  return collectSchemaTypes(blocks).includes(name);
}

export function hasSearchActionSchema(blocks: unknown[]): boolean {
  let found = false;
  const visit = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    if (obj["@type"] === "SearchAction") found = true;
    Object.values(obj).forEach((v) => {
      if (Array.isArray(v)) v.forEach(visit);
      else if (v && typeof v === "object") visit(v);
    });
  };
  blocks.forEach(visit);
  return found;
}
