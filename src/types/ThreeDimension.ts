import { Uri } from 'vscode';
import { ResourcePackGenerator } from '../ResourcePackGenerator';
import { AbstractNode } from './AbstractNode';
import { GeneratorContext } from './Context';
import { listenDir } from '../util/vscodeWrapper';

export abstract class ThreeDimension implements AbstractNode {
    protected modelUri!: Uri;
    protected texturePngs!: Uri[];

    abstract childQuestion(): Promise<void>;
    abstract generate(ctx: GeneratorContext): Promise<void>;

    protected async listenModelFile(): Promise<void> {
        this.modelUri = await listenDir('モデルファイルを選択', '選択', ResourcePackGenerator.getOption(false));
    }

    protected async listenTextureFiles(): Promise<void> {
        this.texturePngs = await listenDir('テクスチャファイルを選択', '選択', ResourcePackGenerator.getOption(true, this.modelUri));
    }
}