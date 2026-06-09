export class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(item) {
        return await this.model.create(item);
    }
    async findOne(filter) {
        return await this.model.findOne(filter);
    }
}
//# sourceMappingURL=base.repository.js.map