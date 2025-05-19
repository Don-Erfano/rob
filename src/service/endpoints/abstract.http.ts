import HttpClient, {appClient} from "@/service/http";

export default abstract class AbstractHttp {
    protected constructor(
        protected readonly url: string,
        protected readonly http: HttpClient = appClient
    ) {}
}