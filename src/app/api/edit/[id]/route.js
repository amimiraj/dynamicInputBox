import { NextResponse } from "next/server";
import util from "util";
import db from "../../../../../util/db";
import fs from 'fs';

const query = util.promisify(db.query).bind(db);


export async function GET(request, { params }) {
    const id = params.id
    try {
        const result = await query(`SELECT * FROM numbers WHERE totalId	 = ${id}`);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse(error, { status: 400 });
    }

}


export async function POST(request, { params }) {



    const id = params.id;
    const numberFields = await request.json();


    try {

        const sum = numberFields
            .filter(item => item.status)
            .reduce((acc, item) => acc + parseInt(item.num, 10), 0);

        const result = await query(`UPDATE totalnumber SET total='${sum}' WHERE id =${id}`);
        const result2 = await query(`DELETE FROM numbers WHERE totalId =${id}`);

        numberFields.forEach((item, index) => {
            query(`INSERT INTO numbers(totalId, serial, num , status) VALUES ('${id}', '${index}', '${item.num}', '${item.status}' )`);

        });

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse(error, { status: 400 });
    }
}
