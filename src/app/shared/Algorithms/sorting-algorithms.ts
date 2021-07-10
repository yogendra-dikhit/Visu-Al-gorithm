export async function BubbleSort() {
  for (let i = 0; i < this.boxes.length - 1; i++) {
    for (
      let j = 0;
      j < this.boxes.length - i - 1 && this.isVisualizerRunning;
      j++
    ) {
      if (this.boxes[j].height > this.boxes[j + 1].height) {
        this.swap(j, j + 1);
        await this.timer();
      }
    }
  }
}

export async function InsertionSort() {
  let i: number, j: number;
  for (i = 1; i < this.boxes.length; i++) {
    if (this.boxes[i].height < this.boxes[i - 1].height) {
      let temp = this.boxes[i];
      for (j = i; j >= 0 && this.isVisualizerRunning; j--) {
        if (this.boxes[j - 1] && temp.height < this.boxes[j - 1].height) {
          this.boxes[j] = this.boxes[j - 1];
        } else {
          this.boxes[j] = temp;
          break;
        }
        await this.timer();
      }
    }
  }
}

export async function SelectionSort() {
  for (let i = 0; i < this.boxes.length; i++) {
    let minLoc = i;
    for (
      let j = i + 1;
      j < this.boxes.length && this.isVisualizerRunning;
      j++
    ) {
      if (this.boxes[minLoc].height > this.boxes[j].height) minLoc = j;
    }
    if (minLoc != i) {
      this.swap(minLoc, i);
      await this.timer();
    }
  }
}

export async function QuickSort(lowerBound: number, upperBound: number) {
  if (lowerBound < upperBound && this.isVisualizerRunning) {
    let pivot = await this.partition(lowerBound, upperBound);
    await this.QuickSort(lowerBound, pivot);
    await this.QuickSort(pivot + 1, upperBound);
  }
}

export async function MergeSort(lowerBound: number, upperBound: number) {
  if (lowerBound < upperBound && this.isVisualizerRunning) {
    let mid = Math.floor((lowerBound + upperBound) / 2);
    await this.MergeSort(lowerBound, mid);
    await this.MergeSort(mid + 1, upperBound);
    await this.merge(lowerBound, mid, upperBound);
  }
}

export function swap(i: number, j: number): void {
  let temp = this.boxes[i];
  this.boxes[i] = this.boxes[j];
  this.boxes[j] = temp;
}

export async function partition(lowerBound: number, upperBound: number) {
  let pivot = this.boxes[Math.floor((lowerBound + upperBound) / 2)];
  let start = lowerBound - 1;
  let end = upperBound + 1;
  while (true) {
    do {
      start++;
    } while (pivot.height > this.boxes[start].height);

    do {
      end--;
    } while (pivot.height < this.boxes[end].height);

    if (start >= end) return end;
    else {
      this.swap(start, end);
      await this.timer();
    }
  }
}

export async function merge(
  lowerBound: number,
  mid: number,
  upperBound: number
) {
  let resultArr = [],
    lIndex = lowerBound,
    rIndex = mid + 1;
  while (lIndex <= mid && rIndex <= upperBound) {
    if (this.boxes[lIndex].height < this.boxes[rIndex].height) {
      resultArr.push(this.boxes[lIndex++]);
    } else {
      resultArr.push(this.boxes[rIndex++]);
    }
  }
  while (lIndex <= mid) {
    resultArr.push(this.boxes[lIndex++]);
  }
  while (rIndex <= upperBound) {
    resultArr.push(this.boxes[rIndex++]);
  }
  for (let i = lowerBound; i <= upperBound; i++) {
    this.boxes[i] = resultArr[i - lowerBound];
    await this.timer();
  }
}
