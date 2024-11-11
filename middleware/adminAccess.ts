import { Request, Response, NextFunction } from 'express';

export const adminDashboard = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user && req.user.role !== role) {
            return res.status(401).send(`
                <h3>You don't have permission!</h3>
                <p>Please <a href="/auth/logout">logout</a> and use admin credentials</p>
                <p>OR <a href="/dashboard">go back</a> to your dasboard.</p>
            `);
        }
        next();
    }

};