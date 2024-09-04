const axios = require("axios");
const {
  getRedNotices,
  getYellowNotices,
  getUnNotices,
  getNoticeWithImages,
} = require("../../src/services/interpolSearchService");

jest.mock("axios");

describe("Interpol Search Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy Path: Fetch Red Notices
  test("should fetch Red Notices successfully", async () => {
    const mockData = {
      _embedded: { notices: [{ id: 1, forename: "John", name: "Doe" }] },
    };
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getRedNotices("John", "Doe");

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      "https://ws-public.interpol.int/notices/v1/red?forename=John&name=Doe",
      expect.any(Object)
    );
  });

  // Worst Case: Fetch Red Notices with API Error
  test("should handle API error when fetching Red Notices", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));

    await expect(getRedNotices("John", "Doe")).rejects.toThrow(
      "Error fetching Red Notices: API Error"
    );
    expect(axios.get).toHaveBeenCalledWith(
      "https://ws-public.interpol.int/notices/v1/red?forename=John&name=Doe",
      expect.any(Object)
    );
  });

  // Happy Path: Fetch Yellow Notices
  test("should fetch Yellow Notices successfully", async () => {
    const mockData = {
      _embedded: { notices: [{ id: 2, forename: "Jane", name: "Doe" }] },
    };
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getYellowNotices("Jane", "Doe");

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      "https://ws-public.interpol.int/notices/v1/yellow?forename=Jane&name=Doe",
      expect.any(Object)
    );
  });

  // Worst Case: Fetch Yellow Notices with API Error
  test("should handle API error when fetching Yellow Notices", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));

    await expect(getYellowNotices("Jane", "Doe")).rejects.toThrow(
      "Error fetching Yellow Notices: API Error"
    );
    expect(axios.get).toHaveBeenCalledWith(
      "https://ws-public.interpol.int/notices/v1/yellow?forename=Jane&name=Doe",
      expect.any(Object)
    );
  });

  // Happy Path: Fetch UN Notices
  test("should fetch UN Notices successfully", async () => {
    const mockData = {
      _embedded: { notices: [{ id: 3, forename: "Sam", name: "Smith" }] },
    };
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getUnNotices("Sam", "Smith");

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      "https://ws-public.interpol.int/notices/v1/un?forename=Sam&name=Smith",
      expect.any(Object)
    );
  });

  // Worst Case: Fetch UN Notices with API Error
  test("should handle API error when fetching UN Notices", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));

    await expect(getUnNotices("Sam", "Smith")).rejects.toThrow(
      "Error fetching UN Notices: API Error"
    );
    expect(axios.get).toHaveBeenCalledWith(
      "https://ws-public.interpol.int/notices/v1/un?forename=Sam&name=Smith",
      expect.any(Object)
    );
  });

  // Happy Path: Fetch Notice Details
  test("should fetch notice details successfully", async () => {
    const mockData = { id: 1, forename: "John", name: "Doe" };
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getNoticeDetails("red", 1);

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      "https://ws-public.interpol.int/notices/v1/red/1",
      expect.any(Object)
    );
  });

  // Worst Case: Fetch Notice Details with API Error
  test("should handle API error when fetching notice details", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));

    await expect(getNoticeDetails("red", 1)).rejects.toThrow(
      "Error fetching notice details for ID 1: API Error"
    );
    expect(axios.get).toHaveBeenCalledWith(
      "https://ws-public.interpol.int/notices/v1/red/1",
      expect.any(Object)
    );
  });

  // Happy Path: Fetch Notice Images
  test("should fetch notice images successfully", async () => {
    const mockData = { _embedded: { images: [{ url: "image-url" }] } };
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getNoticeImages("red", 1);

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      "https://ws-public.interpol.int/notices/v1/red/1/images",
      expect.any(Object)
    );
  });

  // Worst Case: Fetch Notice Images with API Error
  test("should handle API error when fetching notice images", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));

    await expect(getNoticeImages("red", 1)).rejects.toThrow(
      "Error fetching notice images for ID 1: API Error"
    );
    expect(axios.get).toHaveBeenCalledWith(
      "https://ws-public.interpol.int/notices/v1/red/1/images",
      expect.any(Object)
    );
  });

  // Happy Path: Fetch Notice with Images
  test("should fetch notice with images successfully", async () => {
    const mockNoticeData = { id: 1, forename: "John", name: "Doe" };
    const mockImagesData = { _embedded: { images: [{ url: "image-url" }] } };

    axios.get
      .mockResolvedValueOnce({ data: mockNoticeData })
      .mockResolvedValueOnce({ data: mockImagesData });

    const result = await getNoticeWithImages("red", 1);

    expect(result.notice).toEqual(mockNoticeData);
    expect(result.images).toEqual(mockImagesData._embedded.images);
    expect(axios.get).toHaveBeenCalledTimes(2);
  });

  // Worst Case: Fetch Notice with Images - API Error on Details
  test("should handle API error when fetching notice details in getNoticeWithImages", async () => {
    axios.get.mockRejectedValueOnce(new Error("API Error"));

    await expect(getNoticeWithImages("red", 1)).rejects.toThrow(
      "Error fetching notice and images for ID 1: API Error"
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  // Worst Case: Fetch Notice with Images - API Error on Images
  test("should handle API error when fetching notice images in getNoticeWithImages", async () => {
    const mockNoticeData = { id: 1, forename: "John", name: "Doe" };

    axios.get
      .mockResolvedValueOnce({ data: mockNoticeData })
      .mockRejectedValueOnce(new Error("API Error"));

    await expect(getNoticeWithImages("red", 1)).rejects.toThrow(
      "Error fetching notice and images for ID 1: API Error"
    );
    expect(axios.get).toHaveBeenCalledTimes(2);
  });
});
