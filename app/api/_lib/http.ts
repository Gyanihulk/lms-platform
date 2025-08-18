// tiny helpers for consistent responses
export function ok(json: any, init: number = 200) {
    return new Response(JSON.stringify(json), {
      status: init,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  export function bad(msg: string, code = 400) {
    return ok({ error: msg }, code);
  }
  
  export function server(err: unknown, code = 500) {
    console.error(err);
    return ok({ error: "Server error" }, code);
  }
  