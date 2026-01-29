import { ListNode } from "./types";
import { generateAddress } from "./utils";

export class LinkedList {
  private nodes: ListNode[] = [];

  getNodes(): ListNode[] {
    return this.nodes;
  }

  insertAtEnd(value: number) {
    const newNode: ListNode = {
      id: crypto.randomUUID(),
      value,
      adddress: generateAddress(),
      next: null,
    };

    if (this.nodes.length === 0) {
      this.nodes.push(newNode);
      return;
    }

    const lastNode = this.nodes[this.nodes.length - 1];
    lastNode.next = newNode.adddress;

    this.nodes.push(newNode);
  }

  deleteAtEnd(): ListNode | null {
    if (this.nodes.length === 0) return null;

    if (this.nodes.length === 1) {
      return this.nodes.pop() || null;
    }

    const removedNode = this.nodes.pop();

    const newLastNode = this.nodes[this.nodes.length - 1];
    newLastNode.next = null;

    return removedNode || null;
  }

  size() {
    return this.nodes.length;
  }

  clear() {
    this.nodes = [];
  }
}
