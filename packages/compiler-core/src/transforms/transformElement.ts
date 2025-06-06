import { createVNodeCall, NodeTypes } from "../ast";
/**
 * <div></div> -> _createElementVNode('div')
 */
export function transformElement(node, context) {
  if (node.type === NodeTypes.ELEMENT) {
    return () => {
      // 执行时机：onExit
      // tag
      const vnodeTag = `'${node.tag}'`;

      // props
      let vnodeProps;

      // children
      const children = node.children;
      let vnodeChildren = children[0];

      node.codegenNode = createVNodeCall(
        context,
        vnodeTag,
        vnodeProps,
        vnodeChildren
      );
    };
  }
}
