import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Получение списка ответов гостей для страницы администратора."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    password = event.get("headers", {}).get("x-admin-password", "")
    if password != os.environ.get("ADMIN_PASSWORD", ""):
        return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Неверный пароль"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute("""
        SELECT id, name, attending, guests, children, alcohol,
               second_day, transfer, dietary, song, message, created_at
        FROM wedding_responses
        ORDER BY created_at DESC
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    result = []
    for row in rows:
        result.append({
            "id": row[0],
            "name": row[1],
            "attending": row[2],
            "guests": row[3],
            "children": row[4],
            "alcohol": row[5] or [],
            "secondDay": row[6],
            "transfer": row[7],
            "dietary": row[8],
            "song": row[9],
            "message": row[10],
            "createdAt": row[11].isoformat() if row[11] else None,
        })

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"responses": result, "total": len(result)}, ensure_ascii=False),
    }
