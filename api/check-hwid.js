
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false
        }
    }
);

module.exports = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');

    if (req.method !== 'POST') {
        return res.status(405).json({
            allowed: false
        });
    }

    try {
        const { hwid } = req.body || {};

        if (
            typeof hwid !== 'string' ||
            !/^[A-Fa-f0-9]{32}$/.test(hwid)
        ) {
            return res.status(400).json({
                allowed: false,
                username: null
            });
        }

        const { data, error } = await supabase
            .from('voidware_users')
            .select('hwid, username')
            .eq('hwid', hwid.toUpperCase())
            .maybeSingle();

        if (error) {
            throw error;
        }

        return res.status(200).json({
            allowed: !!data,
            username: data ? data.username : null
        });

    } catch (error) {
        console.error('[VoidWare] Database error:', error);

        return res.status(500).json({
            allowed: false,
            username: null
        });
    }
};
