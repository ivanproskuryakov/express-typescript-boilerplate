import {suite, test} from 'mocha-typescript';
import {DatabaseAdapter} from "../../storage/DatabaseAdapter";
import {AppConfig} from "../../app/AppConfig";

@suite('DatabaseAdapter')
export class DatabaseAdapterIntegationTest {

    @test('connect success')
    connect() {
        const adapter = new DatabaseAdapter();
        const config = new AppConfig('test');
        const params = config.getParameters();
        adapter.connect(params.database.username, params.database.password);
    }
}
