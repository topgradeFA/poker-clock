exports.handler = async (event) => {
  const target = event.queryStringParameters && event.queryStringParameters.url;

  if (!target) {
    return { statusCode: 400, body: "Использование: ?url=<адрес>" };
  }

  if (!target.startsWith("https://docs.google.com/")) {
    return { statusCode: 403, body: "Только docs.google.com" };
  }

  try {
    const res = await fetch(target, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PokerClock/1.0)" }
    });
    const body = await res.text();
    return {
      statusCode: res.status,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store"
      },
      body
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: "Ошибка: " + e.message
    };
  }
};
