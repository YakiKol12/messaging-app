export interface Chat {
    id: string;
    title: string;
    createdAt: Date;
    pinned: boolean;
    lastMessageText: string;
    lastMessageAt: Date;
}
