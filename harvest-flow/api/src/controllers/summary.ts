import { Controller, Get, Route } from "tsoa";
import { Summary } from "@harvest-flow/utils";
import { requirePool } from "@harvest-flow/db";

@Route('summary')
export class SummaryController extends Controller {
  @Get()
  public async get(): Promise<Summary> {
    const pool = requirePool();

    return {
      totalLoaned: 0,
      totalRepaid: 0,
      userCount: 0
    }
  }
}