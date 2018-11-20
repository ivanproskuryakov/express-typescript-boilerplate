import {suite, test} from 'mocha-typescript';
import {DatabaseAdapter} from "../../storage/DatabaseAdapter";

@suite('DatabaseAdapter')
export class DatabaseAdapterIntegationTest {

    @test('connect success')
    connect() {
        let adapter = new DatabaseAdapter();
        adapter.connect('', '1');
    }
}
