export class TaskDto {
    title = '';
    data = '';
    description: string | undefined;

    constructor(title: string, data: string, description?: string) {
        this.title = title;
        this.data = data;
        this.description = description;
    }
}