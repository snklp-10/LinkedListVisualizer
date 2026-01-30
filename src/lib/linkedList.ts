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

  insertAtStart(value: number) {
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

    newNode.next = this.nodes[0].adddress;

    this.nodes.unshift(newNode);
  }

  insertAtIndex(value: number, index: number) {
    const newNode: ListNode = {
      id: crypto.randomUUID(),
      value,
      adddress: generateAddress(),
      next: null,
    };

    if (index < 0 || index > this.nodes.length) {
      throw new Error("Index out of bounds");
      return;
    }

    if (index === 0) {
      this.insertAtStart(value);
      return;
    }

    if (index === this.nodes.length) {
      this.insertAtEnd(value);
      return;
    }

    const prevNode = this.nodes[index - 1];
    const nextNode = this.nodes[index];

    newNode.next = nextNode.adddress;

    prevNode.next = newNode.adddress;

    this.nodes.splice(index, 0, newNode);
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

  deleteAtStart(): ListNode | null {
    if (this.nodes.length === 0) return null;

    if (this.nodes.length === 1) {
      return this.nodes.shift() || null;
    }

    const removedNode = this.nodes.shift();

    this.nodes[0].next = this.nodes.length > 1 ? this.nodes[1].adddress : null;

    return removedNode || null;
  }

  deleteAtIndex(index: number): ListNode | null {
    if (this.nodes.length === 0) return null;

    if (index < 0 || index >= this.nodes.length) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      return this.deleteAtStart();
    }

    if (index === this.nodes.length - 1) {
      return this.deleteAtEnd();
    }

    const prevNode = this.nodes[index - 1];
    const nodeToRemove = this.nodes[index];
    const nextNode = this.nodes[index + 1];

    prevNode.next = nextNode.adddress;

    this.nodes.splice(index, 1);

    return nodeToRemove;
  }

  size() {
    return this.nodes.length;
  }

  clear() {
    this.nodes = [];
  }
}
