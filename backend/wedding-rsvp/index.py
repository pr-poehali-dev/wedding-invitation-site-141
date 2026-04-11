import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Сохранение ответа гостя на свадебное приглашение."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")

    name = body.get("name", "").strip()
    if not name:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Имя обязательно"})}

    attending = body.get("attending", "")
    guests = body.get("guests", "1")
    children = body.get("children", "0")
    alcohol = body.get("alcohol", [])
    second_day = body.get("secondDay", "")
    dietary = body.get("dietary", "")
    song = body.get("song", "")
    message = body.get("message", "")

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO wedding_responses
          (name, attending, guests, children, alcohol, second_day, dietary, song, message)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id
        """,
        (name, attending, guests, children, alcohol, second_day, dietary, song, message),
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "id": row[0]}),
    }
