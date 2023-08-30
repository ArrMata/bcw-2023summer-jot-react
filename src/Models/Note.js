export class Note {
	constructor(data) {
		this.id = data.id;
		this.color = data.color;
		this.title = data.title;
		this.creatorId = data.creatorId;
		this.content = data.content;
	}
}