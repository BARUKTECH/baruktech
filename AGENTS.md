<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify it at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BARUK TECH — instruções permanentes para agentes

## Antes de executar

- Sempre analisar o pedido antes de executar qualquer ação.
- Para tarefas de análise, planejamento ou diagnóstico, prefira o agente `plan` (somente leitura) e não altere arquivos.
- Para tarefas pequenas e bem delimitadas, edite diretamente apenas os arquivos necessários.
- Antes de implementar algo grande, apresente um plano resumido e divida a tarefa em etapas.
- Declare quais arquivos serão criados ou modificados antes de alterar.
- Não execute tarefas paralelas desnecessárias.

## Escopo e leitura

- Examine somente os arquivos diretamente relacionados à tarefa.
- Não faça varreduras completas do projeto (listagem massiva de arquivos, `grep` global, leitura de todo o `src/`) sem necessidade real.
- Não reler arquivos já analisados na sessão, salvo quando o conteúdo mudou ou houver dúvida concreta.
- Use `grep`/glob direcionado em vez de varrer a árvore inteira.
- Não iniciar pesquisas externas nem acionar subagentes sem necessidade — prefira resolver no contexto local.

## Implementação

- Não reconstrua funcionalidades que já existem e funcionam.
- Faça alterações pequenas, localizadas e objetivas.
- Preserve integralmente o design, o layout, a acessibilidade e as funcionalidades existentes.
- Não instale dependências sem justificativa explícita.
- Não faça refactors, renomeações ou reorganizações de arquivos sem necessidade para o pedido.
- Nunca apague arquivos.
- Não modifique configurações críticas (`.gitignore`, `package.json`, `tsconfig.json`, `next.config.ts`, `.env`) sem necessidade real e sem avisar.
- Nunca altere funcionalidades sem autorização quando houver risco.
- Não faça push para o GitHub nem modifique o histórico Git existente, a menos que o usuário autorize explicitamente.
- Não exponha chaves, senhas, tokens ou dados de ambiente; preserve `.env` e arquivos sensíveis.

## Verificação

- Não execute a suíte completa de testes quando um teste específico for suficiente para a mudança.
- Não repita comandos que já foram executados com sucesso na mesma sessão, salvo se o estado mudou.
- Rode `npm run lint` e `npx tsc --noEmit` para alterações de código; rode `npm run build` apenas quando a entrega exigir build de produção.
- Os scripts de QA do navegador ficam em `.qa/` e são executados por demanda, não por padrão.

## Conclusão

- Ao concluir, informe somente: arquivos alterados, testes executados e resultado.
- Não gere relatórios longos quando um resumo objetivo resolver.
- Se algo ficou pendente, diga de forma direta e curta o que falta e por quê.
