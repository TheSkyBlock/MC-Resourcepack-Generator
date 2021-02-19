import rfdc from 'rfdc';
import { listenInput, listenPickItem } from '../util/vscodeWrapper';
import { GeneratorContext } from './Context';
import { ParentItem } from './ExtendsQuickPickItem';
import { pathValidater } from './Validater';

export abstract class AbstractNode {
    abstract childQuestion(parentElement: ParentItem[]): Promise<void>;
    abstract generate(ctx: GeneratorContext): Promise<void>;

    protected async listenParentPath(parentElement: ParentItem[]): Promise<string> {
        const items = rfdc()(parentElement);
        items.push({ label: 'other', description: '手入力します' });

        const res = await listenPickItem('parentを選択', items, false);
        return res.label !== 'other'
            ? res.label
            : await listenInput('parent', v => pathValidater(v, 'parentはitem/又はblock/から始まる必要があります。'));
    }
}