import { NextResponse } from "next/server";
import util from "util";
import db from "../../../../util/db";


const query = util.promisify(db.query).bind(db);


export const POST = async (req) => {

    const numberFields = await req.json();

    try {

        const sum = numberFields
            .filter(item => item.status)
            .reduce((acc, item) => acc + parseInt(item.num, 10), 0);

        const resultsTotal = await query(`INSERT INTO  totalnumber (total) VALUES (${sum})`);

        numberFields.forEach((item, index) => {
            query(`INSERT INTO numbers(totalId, serial, num , status) VALUES ('${resultsTotal.insertId}', '${index}', '${item.num}', '${item.status}' )`);
        });


        if (resultsTotal) return new NextResponse(resultsTotal, { status: 201 });


    } catch (error) {
        return new NextResponse(error, { status: 400 });
    }

}