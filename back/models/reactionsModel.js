const pool = require('../database');

class react{
    constructor(id){
        this.id = id 
    }

    async getReacts(){
        const sql = `
            SELECT 
                COUNT(pl) AS pl,
                COUNT(ae) AS ae,
                COUNT(ce) AS ce,
                COUNT(he) AS he,
                COUNT(le) AS le,
                COUNT(she) AS she,
                COUNT(sme) AS sme 
            FROM post_like AS pl 
            FULL JOIN angry_emoji AS ae
            ON pl.post_id = ae.post_id
            FULL JOIN cry_emoji AS ce
            ON pl.post_id = ce.post_id 
            FULL JOIN heart_eye_emoji AS he 
            ON pl.post_id = he.post_id
            FULL JOIN laugh_emoji AS le 
            ON pl.post_id = le.post_id
            FULL JOIN shock_emoji AS she 
            ON pl.post_id = she.post_id
            FULL JOIN smile_emoji AS sme
            ON pl.post_id = sme.post_id
            WHERE pl.post_id = $1
            OR ae.post_id = $1
            OR ce.post_id = $1
            OR he.post_id = $1
            OR le.post_id = $1
            OR she.post_id = $1
            OR sme.post_id = $1 
            GROUP BY pl.post_id
        `
        const value = [this.id]
        const query = await pool.query(sql,value);

        return query.rows
    }
}

module.exports = react;