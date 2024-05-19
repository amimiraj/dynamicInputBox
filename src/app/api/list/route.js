import { NextResponse } from "next/server";
import util from "util";
import db from "../../../../util/db";


const query = util.promisify(db.query).bind(db);


export const GET = async () => {
    try {
        const results = await query(`SELECT t.id,  t.total,  GROUP_CONCAT(n.num ORDER BY n.num SEPARATOR ', ') AS numbers FROM  totalnumber t JOIN numbers n ON t.id = n.totalId GROUP BY t.id, t.total`);
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse(error, { status: 400 });
    }
}


export const DELETE = async (req) => {
    const id = req.nextUrl.searchParams.get("id");
    try {
        const result1 = await query(`DELETE FROM numbers WHERE totalId = ${id}`);
        const result2 = await query(`DELETE FROM totalnumber WHERE id = ${id}`);

        return NextResponse.json({ Message: "Success", status: 201 });
    } catch (error) {
        return NextResponse.json({ Message: "Server Error", status: 500 });

    }

}



