import HttpClient, { appClient,  } from '@/service/http';

/**
 * Base class for HTTP-based services.
 * Subclasses get a `this.url` and `this.http` they can use.
 */
export default abstract class AbstractHttp {
    protected constructor(
        protected readonly url: string,
        protected readonly http: HttpClient = appClient
    ) {}
}