export interface IPagination {
    page: number;
    pageSize: number;
    totalItems: number;
}

export class ResponseModel<T> {
    constructor(public readonly data: T, public readonly message: string) { }
}

export class PaginationResponse<T> extends ResponseModel<T> {
    private pagination: Partial<IPagination>;
    set page(page: number) {
        this.pagination.page = page;
    }
    set pageSize(pageSize: number) {
        this.pagination.pageSize = pageSize;
    }
    set totalItems(total: number) {
        this.pagination.totalItems = total;
    }
    constructor(public readonly data: T, public readonly message: string,) {
        super(data, message);
        this.pagination = {};
    }
}
