import { db } from "./dbConfig";
import { Users, Notifications } from "./schema";
import { eq, sql, and, desc } from "drizzle-orm";

export async function createUser(email: string, name: string){
    try {
        const [user] = await db.insert(Users).values({email, name}).returning().execute();
        return user;
    }catch(error){
        console.log('Error creating user',error)
        return null;
    }
}

export async function getUserByEmail(email: string) {
    try {
        const [user] = await db.select().from(Users).where(eq(Users.email, email)).execute();
        return user;
    } catch (error) {
        console.log('Error fetching user by email', error);
        return null;
    }
}

export async function getUnreadNotifications(userId: number) {
    try {
        const notifications = await db.select().from(Notifications).where(and(eq(Notifications.userId, userId), eq(Notifications.isRead, false))).execute();
        return notifications;
    } catch (error) {
        console.log('Error fetching unread notifications', error);
        return null;
    }
}

export async function getUserBalance(userId: number): Promise<number | null> {
    const transactions = await getRewardTransactions(userId);
    const totalPoints = transactions.reduce((acc, transaction) => {
    
}

export async function getRewardTransactions(userId: number) {